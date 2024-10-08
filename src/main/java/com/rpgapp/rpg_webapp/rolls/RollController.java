package com.rpgapp.rpg_webapp.rolls;

import com.rpgapp.rpg_webapp.character.CharacterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/roll")
public class RollController {

    private final RollService rollService;

    @Autowired
    public RollController(RollService rollService) {
        this.rollService = rollService;
    }

    @PostMapping
    public void addNewRoll(@RequestBody Roll roll) {rollService.rollTheDice(roll);}
}
