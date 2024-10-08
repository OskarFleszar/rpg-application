package com.rpgapp.rpg_webapp.user;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.rpgapp.rpg_webapp.character.Character;
import com.rpgapp.rpg_webapp.rolls.Roll;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "app_user")
public class User implements UserDetails {

    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private long userId;
    private String nickname;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Character> characters;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Roll> roll;

    public User(String nickname, String email, String password) {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
