package com.chatapp.springrest.ChatApp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

    @Column(name = "unique_id")
	private String uniqueId;

    @Column(name = "fname")
	private String fname;

    @Column(name = "lname")
	private String lname;
    
    @Column(name = "email")
	private String email;

    @Column(name = "password")
	private String password;

    @Column(name = "img")
	private String img;

    @Column(name = "status")
	private String status;

    public User() {

    }

    public User(String uniqueId, String fname, String lname, String email, String password, String img, String status) {
        this.uniqueId = uniqueId;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.password = password;
        this.img = img;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUniqueId() {
        return uniqueId;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "User [email=" + email + ", fname=" + fname + ", id=" + id + ", img=" + img + ", lname=" + lname
                + ", password=" + password + ", status=" + status + ", uniqueId=" + uniqueId + "]";
    }
}
