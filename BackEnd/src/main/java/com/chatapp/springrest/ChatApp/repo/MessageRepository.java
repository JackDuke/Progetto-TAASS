package com.chatapp.springrest.ChatApp.repo;

import java.util.List;

import com.chatapp.springrest.ChatApp.model.Message;
import org.springframework.data.repository.CrudRepository;

public interface MessageRepository extends CrudRepository<Message, Long> {
	List<Message> existsById(long id);

}