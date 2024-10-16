package com.rpgapp.rpg_webapp.user;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public void addNewUser(User user) {
        Optional<User> userOptional = userRepository.findUserByEmail(user.getEmail());
        if (userOptional.isPresent()) {
            throw new IllegalStateException("email taken");
        }
        Optional<User> userOptional2 = userRepository.findUserByNickname(user.getNickname());
        if (userOptional2.isPresent()) {
            throw new IllegalStateException("nickname taken");
        }
        userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        boolean exists = userRepository.existsById(userId);
        if (!exists) {
            throw new IllegalStateException("student with id: " + userId + " doesn't exist");
        }
        userRepository.deleteById(userId);

    }

    @Transactional
    public void updateUser(Long userId, User updatedUser) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalStateException("student with id: " + userId + " doesn't exist"));

        if (updatedUser.getNickname() != null && !updatedUser.getNickname().isEmpty() && !Objects.equals(user.getNickname(), updatedUser.getNickname())) {
            user.setNickname(updatedUser.getNickname());
        }

        if (updatedUser.getEmail() != null && !updatedUser.getEmail().isEmpty() && !Objects.equals(user.getEmail(), updatedUser.getEmail())) {
            Optional<User> userOptional = userRepository.findUserByEmail(updatedUser.getEmail());
            if (userOptional.isPresent()) {
                throw new IllegalStateException("email taken");
            }
            user.setEmail(updatedUser.getEmail());
        }

        if(updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty() && !Objects.equals(user.getPassword(), updatedUser.getPassword())){
            user.setPassword(updatedUser.getPassword());
        }
    }

}
