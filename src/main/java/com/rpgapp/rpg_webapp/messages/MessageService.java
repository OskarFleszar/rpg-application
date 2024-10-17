package com.rpgapp.rpg_webapp.messages;

import com.rpgapp.rpg_webapp.character.CharacterService;
import com.rpgapp.rpg_webapp.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    private final CharacterService characterService;

    @Autowired
    public MessageService(MessageRepository messageRepository, CharacterService characterService) {
        this.messageRepository = messageRepository;
        this.characterService = characterService;
    }


    public void sendMessage(Message message) {

        User user = characterService.getCurrentUser();
        message.setUser(user);
        message.setMessageTime(LocalDateTime.now());
        messageRepository.save(message);
    }
}
