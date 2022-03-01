package com.chatapp.springrest.ChatApp.controller;



import java.util.List;

import com.chatapp.springrest.ChatApp.model.Message;
import com.chatapp.springrest.ChatApp.repo.MessageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class MessageController {
    
    @Autowired
	MessageRepository repository;

    /* @PostMapping(value = "/chat")
	public List<Message> getChat(@RequestBody String uniqueId, String incomingId) {
        
		List<Message> messages = repository.findByUniqueIdAndIncomingId(Sort.by("id"), uniqueId, incomingId);
		return messages;
	} */
}
