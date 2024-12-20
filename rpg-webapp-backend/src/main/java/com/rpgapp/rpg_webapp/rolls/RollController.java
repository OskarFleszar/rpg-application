package com.rpgapp.rpg_webapp.rolls;

import com.rpgapp.rpg_webapp.campaign.Campaign;
import com.rpgapp.rpg_webapp.campaign.CampaignRepository;
import com.rpgapp.rpg_webapp.campaign.CampaignService;
import com.rpgapp.rpg_webapp.character.CharacterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/roll")
public class RollController {

    private final RollService rollService;
    private final CampaignRepository campaignRepository;

    @Autowired
    public RollController(RollService rollService, CampaignRepository campaignRepository) {
        this.rollService = rollService;
        this.campaignRepository = campaignRepository;
    }

    @PostMapping("/{campaignId}")
    public void addNewRoll(@RequestBody Roll roll, @PathVariable long campaignId) {

        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new IllegalArgumentException("Campaign with Id: " + campaignId + " not found"));

        roll.setCampaign(campaign);
        rollService.rollTheDice(roll, campaignId);
    }

    @MessageMapping("/roll/{campaignId}")
    public void rollDice(@DestinationVariable long campaignId, @Payload Roll roll, SimpMessageHeaderAccessor headerAccessor) {
        rollService.rollTheDiceWs(roll, campaignId, headerAccessor);
    }

}
