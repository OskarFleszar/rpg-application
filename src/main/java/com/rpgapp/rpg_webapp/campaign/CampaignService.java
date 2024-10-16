package com.rpgapp.rpg_webapp.campaign;

import com.rpgapp.rpg_webapp.character.CharacterService;
import com.rpgapp.rpg_webapp.user.User;
import com.rpgapp.rpg_webapp.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final CharacterService characterService;
    private final UserRepository userRepository;
    @Autowired
    public CampaignService(CampaignRepository campaignRepository, CharacterService characterService, UserRepository userRepository) {
        this.campaignRepository = campaignRepository;
        this.characterService = characterService;
        this.userRepository = userRepository;
    }


    public void createCampaign(Campaign campaign) {
        User user = characterService.getCurrentUser();
        campaign.setGameMaster(user);

        if (campaign.getPlayers() == null) {
            campaign.setPlayers(new HashSet<>());  // Upewnij się, że Set<User> nie jest null
        }

        campaign.getPlayers().add(user);  // Dodanie użytkownika jako gracza

        campaignRepository.save(campaign);
    }


    public void addNewUserToCampaign(String nickname, long campaignId) {

        Optional<User> user = userRepository.findUserByNickname(nickname);
        if (!user.isPresent()) {
            throw new IllegalStateException("User with nickname '" + nickname + "' not found");
        }
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new IllegalStateException("Campaign not found"));

        campaign.getPlayers().add(user.get());

        campaignRepository.save(campaign);
    }
}
