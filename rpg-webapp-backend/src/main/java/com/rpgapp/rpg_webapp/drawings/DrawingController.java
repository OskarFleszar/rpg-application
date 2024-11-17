package com.rpgapp.rpg_webapp.drawings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drawing")
public class DrawingController {

    private final DrawingService drawingService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public DrawingController(DrawingService drawingService, SimpMessagingTemplate messagingTemplate) {
        this.drawingService = drawingService;
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/{campaignId}")
    public Drawing saveDrawing(@RequestBody String drawingData, @PathVariable Long campaignId, SimpMessageHeaderAccessor headerAccessor) {
        return drawingService.saveDrawing(drawingData, campaignId,headerAccessor);
    }

    @GetMapping("/{campaignId}")
    public List<Drawing> getDrawings(@PathVariable Long campaignId) {
        return drawingService.getDrawingsByCampaign(campaignId);
    }

    @MessageMapping("/drawing/{campaignId}")
    public void broadcastDrawing(@Payload String drawingData, @DestinationVariable Long campaignId, SimpMessageHeaderAccessor headerAccessor) {
        // Zapis rysunku w bazie danych
        Drawing savedDrawing = drawingService.saveDrawing(drawingData, campaignId, headerAccessor);


    }
}