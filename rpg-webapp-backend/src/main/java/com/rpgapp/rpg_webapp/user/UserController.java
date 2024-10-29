package com.rpgapp.rpg_webapp.user;

import com.rpgapp.rpg_webapp.character.CharacterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(path = "api/user")
public class UserController {

    private final UserService userService;
    private final CharacterService characterService;

    @Autowired
    public UserController(UserService userService, CharacterService characterService) {
        this.userService = userService;
        this.characterService = characterService;
    }

    @GetMapping
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @GetMapping(path="/one")
    public User getOneUser() { return characterService.getCurrentUser();}

    @GetMapping("/profileImage")
    public ResponseEntity<byte[]> getProfileImage() {
        User user = characterService.getCurrentUser();
        byte[] image = user.getProfileImage();
        return ResponseEntity.ok().contentType(MediaType.valueOf(user.getImageType())).body(image);
    }


    @PostMapping
    public void registerNewUser(@RequestBody User user){
        userService.addNewUser(user);
    }

    @PostMapping("/uploadProfileImage")
    public void uploadProfileImage(MultipartFile file) throws IOException {userService.saveProfileImage(file);}

    @DeleteMapping(path = "{userId}")
    public void deleteUse(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
    }

    @PutMapping
    public void updateUser(
            @RequestBody User user){
        userService.updateUser(user);
    }

}
