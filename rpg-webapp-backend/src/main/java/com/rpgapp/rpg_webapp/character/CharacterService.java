package com.rpgapp.rpg_webapp.character;

import com.rpgapp.rpg_webapp.user.User;
import com.rpgapp.rpg_webapp.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class CharacterService {

    private final CharacterRepository characterRepository;
    private final UserRepository userRepository;

    @Autowired
    public CharacterService(CharacterRepository characterRepository, UserRepository userRepository) {
        this.characterRepository = characterRepository;
        this.userRepository = userRepository;
    }

    public User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof UserDetails) {
            String email = ((UserDetails) principal).getUsername();
            return userRepository.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        } else {
            throw new IllegalStateException("User not authenticated");
        }
    }

    public User getCurrentUserWS(SimpMessageHeaderAccessor headerAccessor) {
        // Najpierw sprawdzamy sesję WebSocket (jeśli headerAccessor jest dostępny)
            UserDetails userDetails = (UserDetails) headerAccessor.getSessionAttributes().get("user");
                String email = userDetails.getUsername();
                return userRepository.findUserByEmail(email)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found in WebSocket session"));

    }

    public List<Character> getCharacters() {
        User user = getCurrentUser();
        return user.getCharacters();
    }
    public Optional<Character> getOneCharacter(Long characterId) {
        return characterRepository.findById(characterId);
    }

    public void addNewCharacter(Character character) {
        User user = getCurrentUser();
        character.setUser(user);
        characterRepository.save(character);
    }

    public void deleteCharacter(Long characterId) {
        boolean exists = characterRepository.existsById(characterId);
        if (!exists) {
            throw new IllegalStateException("character with id: " + characterId + " doesn't exist");
        }
        characterRepository.deleteById(characterId);
    }


    @Transactional
    public void saveCharacterImage(MultipartFile file, Long characterId) throws IOException {
        Character character = characterRepository.findById(characterId)
                .orElseThrow(() -> new IllegalStateException("Character with id: " + characterId + " doesn't exist"));

        character.setImageType(file.getContentType());
        character.setCharacterImage(file.getBytes());
        characterRepository.save(character);
    }

    @Transactional
    public void updateCharacter(Long characterId, Character updatedCharacter) {
        Character existingCharacter = characterRepository.findById(characterId)
                .orElseThrow(() -> new IllegalStateException("Character with id: " + characterId + " doesn't exist"));


        if (updatedCharacter.getName() != null) {
            existingCharacter.setName(updatedCharacter.getName());
        }
        if (updatedCharacter.getRace() != null) {
            existingCharacter.setRace(updatedCharacter.getRace());
        }
        if (updatedCharacter.getCurrentProfession() != null) {
            existingCharacter.setCurrentProfession(updatedCharacter.getCurrentProfession());
        }
        if (updatedCharacter.getLastProfession() != null) {
            existingCharacter.setLastProfession(updatedCharacter.getLastProfession());
        }
        if (updatedCharacter.getAge() != null) {
            existingCharacter.setAge(updatedCharacter.getAge());
        }
        if (updatedCharacter.getGender() != null) {
            existingCharacter.setGender(updatedCharacter.getGender());
        }
        if (updatedCharacter.getEyeColor() != null) {
            existingCharacter.setEyeColor(updatedCharacter.getEyeColor());
        }
        if (updatedCharacter.getWeight() != null) {
            existingCharacter.setWeight(updatedCharacter.getWeight());
        }
        if (updatedCharacter.getHairColor() != null) {
            existingCharacter.setHairColor(updatedCharacter.getHairColor());
        }
        if (updatedCharacter.getHeight() != null) {
            existingCharacter.setHeight(updatedCharacter.getHeight());
        }
        if (updatedCharacter.getStarSign() != null) {
            existingCharacter.setStarSign(updatedCharacter.getStarSign());
        }
        if (updatedCharacter.getSiblings() != null) {
            existingCharacter.setSiblings(updatedCharacter.getSiblings());
        }
        if (updatedCharacter.getBirthPlace() != null) {
            existingCharacter.setBirthPlace(updatedCharacter.getBirthPlace());
        }
        if (updatedCharacter.getSpecialSigns() != null) {
            existingCharacter.setSpecialSigns(updatedCharacter.getSpecialSigns());
        }
        if (updatedCharacter.getCampaignName() != null) {
            existingCharacter.setCampaignName(updatedCharacter.getCampaignName());
        }
        if (updatedCharacter.getCampaignYear() != null) {
            existingCharacter.setCampaignYear(updatedCharacter.getCampaignYear());
        }
        if (updatedCharacter.getDmName() != null) {
            existingCharacter.setDmName(updatedCharacter.getDmName());
        }
        if (updatedCharacter.getTotalExp() != null) {
            existingCharacter.setTotalExp(updatedCharacter.getTotalExp());
        }
        if (updatedCharacter.getCurrentExp() != null) {
            existingCharacter.setCurrentExp(updatedCharacter.getCurrentExp());
        }
        if (updatedCharacter.getGold() != null) {
            existingCharacter.setGold(updatedCharacter.getGold());
        }
        if (updatedCharacter.getSilver() != null) {
            existingCharacter.setSilver(updatedCharacter.getSilver());
        }
        if (updatedCharacter.getBronze() != null) {
            existingCharacter.setBronze(updatedCharacter.getBronze());
        }
        if (updatedCharacter.getAttributes() != null) {
            existingCharacter.setAttributes(updatedCharacter.getAttributes());
        }
        if (updatedCharacter.getSkills() != null) {
            existingCharacter.setSkills(updatedCharacter.getSkills());
        }
        if (updatedCharacter.getWeapons() != null) {
            existingCharacter.setWeapons(updatedCharacter.getWeapons());
        }
        if (updatedCharacter.getArmor() != null) {
            existingCharacter.setArmor(updatedCharacter.getArmor());
        }
        if (updatedCharacter.getTalents() != null) {
            existingCharacter.setTalents(updatedCharacter.getTalents());
        }
        if (updatedCharacter.getEquipment() != null) {
            existingCharacter.setEquipment(updatedCharacter.getEquipment());
        }
        if (updatedCharacter.getBackstory() != null) {
            existingCharacter.setBackstory(updatedCharacter.getBackstory());
        }
        if (updatedCharacter.getNotes() != null) {
            existingCharacter.setNotes(updatedCharacter.getNotes());
        }

        characterRepository.save(existingCharacter);
    }


}

