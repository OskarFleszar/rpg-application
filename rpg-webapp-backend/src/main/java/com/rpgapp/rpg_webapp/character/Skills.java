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
        addSkill("Charakteryzacja", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Dowodzenie", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Hazard", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Jeździectwo", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Mocna głowa", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Opieka na zwierzętami", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Plotkowanie", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Pływanie", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Powożenie", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Przekonywanie", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Przeszukiwanie", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Skradanie się", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Spostrzegawczość", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Sztuka przetrwania", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Targowanie", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Ukrywanie się", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Wioślarstwo", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Wspinaczka", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Wycena", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
        addSkill("Zastraszanie", SkillLevel.NOT_PURCHASED, SkillType.BASIC);
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
