package com.rpgapp.rpg_webapp.drawings;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.rpgapp.rpg_webapp.campaign.Campaign;
import com.rpgapp.rpg_webapp.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "drawings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Drawing {

    @Id
    @SequenceGenerator(
            name = "drawing_sequence",
            sequenceName = "drawing_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "drawing_sequence"
    )
    private long drawingId;

    @Column(columnDefinition = "TEXT")
    private String drawingData;

    @ManyToOne
    @JsonBackReference ("drawing_user")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JsonBackReference("drawing_campaign")
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;

    private LocalDateTime createdTime;
}

