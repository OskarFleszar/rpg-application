package com.rpgapp.rpg_webapp.messages;

import com.rpgapp.rpg_webapp.campaign.Campaign;
import com.rpgapp.rpg_webapp.campaign.CampaignRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/message")
public class MessageController {

    private final MessageService messageService;
    private final CampaignRepository campaignRepository;

    public MessageController(MessageService messageService, CampaignRepository campaignRepository) {
        this.messageService = messageService;
        this.campaignRepository = campaignRepository;
    }

    @PostMapping("/{campaignId}")
    public void addNewMessage(@RequestBody Message message, @PathVariable long campaignId) {

        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new IllegalArgumentException("Campaign with Id: " + campaignId + " not found"));

        message.setCampaign(campaign);
        messageService.sendMessage(message);
    }


}
