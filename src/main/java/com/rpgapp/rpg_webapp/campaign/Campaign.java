package com.rpgapp.rpg_webapp.campaign;

import com.rpgapp.rpg_webapp.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "campaigns")
@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
public class Campaign {

    @Id
    @SequenceGenerator(
            name = "campaign_sequence",
            sequenceName = "campaign_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "campaign_sequence"
    )
    private long campaignId;
    private String campaignName;

    @ManyToOne
    @JoinColumn(name = "game_master_id")  // Relacja do Game Mastera
    private User gameMaster;  // Użytkownik pełniący rolę Game Mastera

    @ManyToMany
    @JoinTable(
            name = "campaign_user",
            joinColumns = @JoinColumn(name = "campaign_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> players;  // Użytkownicy biorący udział w kampanii

    public Campaign(String campaignName, User gameMaster, Set<User> players) {
        this.campaignName = campaignName;
        this.gameMaster = gameMaster;
        this.players = players;
    }
}
