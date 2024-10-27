package com.rpgapp.rpg_webapp.campaign;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(path = "api/campaign")
public class CampaignController {

    private final CampaignService campaignService;

    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    @PostMapping("/create")
    public void createNewCampaign (@RequestBody Campaign campaign) {
        campaignService.createCampaign(campaign);
    }

    @PostMapping("/{campaignId}/add")
    public void addUserToCampaign(@RequestBody Map<String, String> payload, @PathVariable Long campaignId) {
        String nickname = payload.get("nickname");
        campaignService.addNewUserToCampaign(nickname, campaignId);
    }



}
