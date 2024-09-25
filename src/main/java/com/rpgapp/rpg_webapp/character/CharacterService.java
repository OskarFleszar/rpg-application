package com.rpgapp.rpg_webapp.character;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CharacterService {

    private final CharacterRepository characterRepository;

    @Autowired
    public CharacterService(CharacterRepository characterRepository) {
        this.characterRepository = characterRepository;
    }

    public List<Character> getCharacters() {
        return characterRepository.findAll();
    }

    public void addNewCharacter(Character character) {

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
        if (updatedCharacter.getArmors() != null) {
            existingCharacter.setArmors(updatedCharacter.getArmors());
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

        // Zapisanie zmian
        characterRepository.save(existingCharacter);
    }



}

