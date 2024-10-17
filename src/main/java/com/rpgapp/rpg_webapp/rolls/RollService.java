package com.rpgapp.rpg_webapp.rolls;

import com.rpgapp.rpg_webapp.character.CharacterService;
import com.rpgapp.rpg_webapp.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class RollService {

    private final RollRepository rollRepository;
    private final CharacterService characterService;

    @Autowired
    public RollService(RollRepository rollRepository, CharacterService characterService) {
        this.rollRepository = rollRepository;
        this.characterService = characterService;
    }

    public int diceRoll(int sides) {
        return (int) (Math.random() * sides) + 1;
    }

    public int getSides(String diceType) {

        return switch (diceType) {
            case "d4" -> 4;
            case "d6" -> 6;
            case "d8" -> 8;
            case "d10" -> 10;
            case "d12" -> 12;
            case "d20" -> 20;
            case "d100" -> 100;
            default -> throw new IllegalArgumentException("Unknown dice type: " + diceType);
        };
    }

    public void rollTheDice(Roll roll) {
        int numberOfDice = roll.getNumberOfDice();
        int sides = getSides(roll.getRollType());
        List<Integer> singleDiceRolls = new ArrayList<>();
        int result = 0;
        for(int i = 0; i < numberOfDice; i++) {
            int singleResult = diceRoll(sides);
            singleDiceRolls.add(singleResult);
            result += singleResult;
        }
        roll.setSingleDiceResult(singleDiceRolls);
        roll.setRollResult(result);
        User user = characterService.getCurrentUser();
        roll.setUser(user);
        roll.setRollTime(LocalDateTime.now());
        rollRepository.save(roll);
    }

}
