package com.rpgapp.rpg_webapp.campaign;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END " +
            "FROM Campaign c JOIN c.players p WHERE c.id = :campaignId AND p.id = :userId")
    boolean existsByUserAndCampaign(@Param("userId") Long userId, @Param("campaignId") Long campaignId);
}

