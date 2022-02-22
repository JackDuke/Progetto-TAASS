package com.chatapp.springrest.ChatApp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "messages")
public class Message {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

    @Column(name = "id_destinatario")
	private String idDestinatario;

    @Column(name = "id_mittente")
	private String idMittente;

    @Column(name = "msg")
	private String msgText;

    public Message() {

    }

    public Message(long id, String idDestinatario, String idMittente, String msgText) {
        this.id = id;
        this.idDestinatario = idDestinatario;
        this.idMittente = idMittente;
        this.msgText = msgText;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getIdDestinatario() {
        return idDestinatario;
    }

    public void setIdDestinatario(String idDestinatario) {
        this.idDestinatario = idDestinatario;
    }

    public String getIdMittente() {
        return idMittente;
    }

    public void setIdMittente(String idMittente) {
        this.idMittente = idMittente;
    }

    public String getMsgText() {
        return msgText;
    }

    public void setMsgText(String msgText) {
        this.msgText = msgText;
    }

    @Override
    public String toString() {
        return "Message [id=" + id + ", idDestinatario=" + idDestinatario + ", idMittente=" + idMittente + ", msgText="
                + msgText + "]";
    }

}
