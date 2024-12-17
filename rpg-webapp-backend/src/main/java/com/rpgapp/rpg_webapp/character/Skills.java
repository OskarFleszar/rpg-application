package com.rpgapp.rpg_webapp.character;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Embeddable
@Data
public class Skills {

    public enum SkillLevel {
        NOT_PURCHASED, // Niewykupiona
        PURCHASED,     // Wykupiona
        PLUS_10,       // +10
        PLUS_20        // +20
    }

    public enum SkillType {
        BASIC,         // Umiejętności podstawowe
        ADVANCED       // Umiejętności zaawansowane
    }

    @ElementCollection
    @MapKeyColumn(name = "skill_name")
    @Column(name = "skill_info")
    private Map<String, SkillInfo> skills = new HashMap<>();

    @Data
    @NoArgsConstructor
    @Embeddable
    public static class SkillInfo {
        private SkillLevel level;
        private SkillType type;

        public SkillInfo(SkillLevel level, SkillType type) {
            this.level = level;
            this.type = type;
        }
    }

    // Konstruktor, który inicjalizuje umiejętności podstawowe
    public Skills() {
        initializeBasicSkills();
    }

    // Metoda do inicjalizacji umiejętności podstawowych
    private void initializeBasicSkills() {
        addSkill("Disguise", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Leadership", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Gambling", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Riding", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Strong Head", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Animal Care", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Gossip", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Swimming", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Driving", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Persuasion", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Searching", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Sneaking", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Perception", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Survival", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Bargaining", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Hiding", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Rowing", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Climbing", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Appraisal", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Intimidation", SkillLevel.NOT_PURCHASED, SkillType.BASIC);

    }

    // Metoda do dodawania umiejętności
    public void addSkill(String skillName, SkillLevel level, SkillType type) {
        skills.put(skillName, new SkillInfo(level, type));
    }

    // Metoda do aktualizacji poziomu umiejętności
    public void updateSkillLevel(String skillName, SkillLevel level) {
        if (skills.containsKey(skillName)) {
            skills.get(skillName).setLevel(level);
        }
    }

    // Metoda do sprawdzania poziomu umiejętności
    public SkillLevel getSkillLevel(String skillName) {
        return skills.containsKey(skillName) ? skills.get(skillName).getLevel() : SkillLevel.NOT_PURCHASED;
    }

    // Metoda do sprawdzania typu umiejętności
    public SkillType getSkillType(String skillName) {
        return skills.containsKey(skillName) ? skills.get(skillName).getType() : null;
    }
}
