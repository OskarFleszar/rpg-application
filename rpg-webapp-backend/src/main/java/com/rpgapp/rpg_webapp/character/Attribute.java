package com.rpgapp.rpg_webapp.character;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.MapKeyColumn;
import lombok.*;

import java.util.HashMap;
import java.util.Map;

@Data
@Embeddable
public class Attribute {

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Embeddable
    public static class Attributes {
        private int baseValue;          // Wartość startowa
        private int advancementPoints;   // Punkty rozwoju
        private int currentValue;        // Wartość aktualna
    }

    @ElementCollection
    @MapKeyColumn(name = "attribute_name")
    @Column(name = "attribute")
    private Map<String, Attributes> attributes = new HashMap<>();

    // Domyślny konstruktor
    public Attribute() {
        initializeAttributes();
    }

    // Metoda do inicjalizacji atrybutów z nazwami
    private void initializeAttributes() {
        // Dodawanie atrybutów z pustymi wartościami
        addAttribute("Weapon Skill", new Attributes());       // Umiejętności walki wręcz (WW)
        addAttribute("Ballistic Skill", new Attributes());     // Umiejętności strzeleckie (US)
        addAttribute("Strength", new Attributes());             // Krzepa (K)
        addAttribute("Resistance", new Attributes());           // Odpornosc (Odp)
        addAttribute("Agility", new Attributes());              // Zręczność (Zr)
        addAttribute("Intelligence", new Attributes());         // Inteligencja (Int)
        addAttribute("Willpower", new Attributes());            // Siła woli (SW)
        addAttribute("Fellowship", new Attributes());           // Ogłada (Ogd)

        // Cechy dodatkowe
        addAttribute("Attacks", new Attributes());              // Ataki (A)
        addAttribute("Health", new Attributes());               // Punkty żywotności (Zyw)
        addAttribute("Magic", new Attributes());                // Magia (M)
        addAttribute("Madness Points", new Attributes());       // Punkty obłędu (PO)
        addAttribute("Fate Points", new Attributes());          // Punkty przeznaczenia (PP)
    }


    // Metoda do dodawania atrybutów
    public void addAttribute(String attributeName, Attributes attributes) {
        this.attributes.put(attributeName, attributes);
    }

    // Metoda do aktualizacji atrybutu
    public void updateAttribute(String attributeName, int baseValue, int advancementPoints, int currentValue) {
       if(attributes.containsKey(attributeName)) {
           attributes.get(attributeName).setBaseValue(baseValue);
           attributes.get(attributeName).setCurrentValue(currentValue);
           attributes.get(attributeName).setAdvancementPoints(advancementPoints);
       }
    }
}
