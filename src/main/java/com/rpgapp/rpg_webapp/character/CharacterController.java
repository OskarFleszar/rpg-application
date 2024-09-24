package com.rpgapp.rpg_webapp.character;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping
    public void makeNewCharacter(@RequestBody Character character) {characterService.addNewCharacter(character);}

    @DeleteMapping(path ="{characterId}")
    public void deleteCharacter(@PathVariable("characterId") Long characterId) {characterService.deleteCharacter(characterId);}


    @PutMapping(path = "{characterId}")
    public void updateCharacter(@PathVariable("characterId") Long characterId,
                                @RequestBody Character character) {

        characterService.updateCharacter(characterId, character);
    }



}
