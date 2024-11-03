package com.rpgapp.rpg_webapp.character;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/character")
public class CharacterController {

    private final CharacterService characterService;

    @Autowired
    public CharacterController(CharacterService characterService) {
        this.characterService = characterService;
    }

    @GetMapping
    public List<Character> getCharacters() {return characterService.getCharacters();}

    @GetMapping(path ="{characterId}")
    public Optional<Character> getOneCharacter(@PathVariable("characterId") Long characterId) {
       return characterService.getOneCharacter(characterId);
    }

    @PostMapping
    public void makeNewCharacter(@RequestBody Character character) {characterService.addNewCharacter(character);}

    @DeleteMapping(path ="{characterId}")
    public void deleteCharacter(@PathVariable("characterId") Long characterId) {characterService.deleteCharacter(characterId);}


    @PutMapping(path = "{characterId}")
    public void updateCharacter(@PathVariable("characterId") Long characterId,
                                @RequestBody Character character) {

        characterService.updateCharacter(characterId, character);
    }
    @GetMapping("/default-skills")
    public Skills getDefaultSkills() {
        return new Skills();
    }

    @GetMapping("/default-attributes")
    public Attribute getDefaultAttributes() {
        return new Attribute();
    }




}
