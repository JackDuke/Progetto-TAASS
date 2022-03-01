package com.chatapp.springrest.ChatApp.controller;



import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import com.chatapp.springrest.ChatApp.model.Message;
import com.chatapp.springrest.ChatApp.repo.MessageRepository;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class MessageController {
    
    @Autowired
	MessageRepository repository;

	@PersistenceContext
    private EntityManager entityManager;

    @PostMapping(value = "/chat")
	@ResponseBody
	public List<Message> getChat(@RequestBody ObjectNode json) {
		String uniqueId = json.get("uniqueId").asText();
   		String incomingId = json.get("incomingId").asText();
		System.out.println(json);
		List<Message> messages = repository.findByUniqueIdAndIncomingId(Sort.by("id"), uniqueId, incomingId);
		return messages;
	}

	@Transactional
	@PostMapping(value = "/send")
	public Message sendMessage(@RequestBody Message message) {

		Message _message = repository.save(new Message(message.getIdDestinatario(), message.getIdMittente(), message.getMsgText()));
		System.out.println("Messaggio inviato con successo!");
		return _message;

	}

	@DeleteMapping(value = "/delete/{id}")
	public ResponseEntity<String> deleteMessage(@PathVariable("id") long id) {
		System.out.println("Delete Message with ID = " + id + "...");

		repository.deleteById(id);

		return new ResponseEntity<>("Message has been deleted!", HttpStatus.OK);
	}
}
