package com.rpgapp.rpg_webapp.rolls;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.rpgapp.rpg_webapp.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "dice_rolls")
public class Roll {


    @Id
    @SequenceGenerator(
            name = "roll_sequence",
            sequenceName = "roll_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "roll_sequence"
    )
    private long rollId;
    private int rollResult;
    private List<Integer> singleDiceResult;
    private int numberOfDice;
    private String rollType;
    private LocalDateTime rollTime;


    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Roll(int rollResult, List<Integer> singleDiceResult, int numberOfDice, String rollType, LocalDateTime rollTime, int timesRolled, User user) {
        this.rollResult = rollResult;
        this.singleDiceResult = singleDiceResult;
        this.numberOfDice = numberOfDice;
        this.rollType = rollType;
        this.rollTime = rollTime;
        this.user = user;
    }
}
