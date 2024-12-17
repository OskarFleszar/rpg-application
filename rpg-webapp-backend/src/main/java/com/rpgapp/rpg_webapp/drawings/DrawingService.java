package com.rpgapp.rpg_webapp.drawings;

import com.rpgapp.rpg_webapp.campaign.Campaign;
import com.rpgapp.rpg_webapp.campaign.CampaignRepository;
import com.rpgapp.rpg_webapp.character.CharacterService;
import com.rpgapp.rpg_webapp.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DrawingService {
    private final DrawingRepository drawingRepository;
    private final CampaignRepository campaignRepository;
    private final CharacterService characterService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public DrawingService(
            DrawingRepository drawingRepository,
            CampaignRepository campaignRepository,
            CharacterService characterService,
            SimpMessagingTemplate messagingTemplate
    ) {
        this.drawingRepository = drawingRepository;
        this.campaignRepository = campaignRepository;
        this.characterService = characterService;
        this.messagingTemplate = messagingTemplate;
    }

    public Drawing saveDrawing(String drawingData, Long campaignId, SimpMessageHeaderAccessor headerAccessor) {
        User user = characterService.getCurrentUserWS(headerAccessor); // Pobranie aktualnego użytkownika
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new IllegalArgumentException("Campaign not found"));

        Drawing drawing = new Drawing();
        drawing.setDrawingData(drawingData);
        drawing.setUser(user);
        drawing.setCampaign(campaign);
        drawing.setCreatedTime(LocalDateTime.now());

        Drawing savedDrawing = drawingRepository.save(drawing);

        messagingTemplate.convertAndSend("/topic/" + campaignId, savedDrawing);


        return savedDrawing;
    }

    public List<Drawing> getDrawingsByCampaign(Long campaignId) {
        return drawingRepository.findByCampaign_CampaignId(campaignId);
    }
}