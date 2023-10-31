package com.jaydandowler.propfolio.models;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "properties")
public class Property {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotEmpty(message = "Property must have an address")
    @Size(min = 5, max = 300, message = "Address must be between 5 and 300 characters")
    private String address;
    
    @NotNull(message = "Square footage is required")
    @Min(value = 100, message = "Square footage must be at least 100")
    @Max(value = 10000, message = "Square footage must be at most 10000")
    private Integer sqft;
    
    @NotNull(message = "Rented status is required")
    private Boolean isRented;
    
    @NotNull(message = "Number of bedrooms is required")
    @Min(value = 1, message = "Must have at least 1 bedroom")
    @Max(value = 10, message = "Must have at most 10 bedrooms")
    private Integer bedrooms;
    
    @NotNull(message = "Number of baths is required")
    @Min(value = 1, message = "Must have at least 1 bath")
    @Max(value = 10, message = "Must have at most 10 baths")
    private Integer baths;
    
    @NotNull(message = "Expenses amount is required")
    @Positive(message = "Expenses must be a positive number")
    private Integer expenses;
    
    @Min(value = 0, message = "Rent income must be a non-negative number")
    private Integer rentIncome;
    
    private String imageUrl;
    
    @Column(updatable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createdAt;
    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date updatedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false)
    @JsonBackReference
    private User user;

    public Property() {
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getSqft() {
        return this.sqft;
    }

    public void setSqft(Integer sqft) {
        this.sqft = sqft;
    }

    public Boolean isIsRented() {
        return this.isRented;
    }

    public Boolean getIsRented() {
        return this.isRented;
    }

    public void setIsRented(Boolean isRented) {
        this.isRented = isRented;
    }

    public Integer getBedrooms() {
        return this.bedrooms;
    }

    public void setBedrooms(Integer bedrooms) {
        this.bedrooms = bedrooms;
    }

    public Integer getBaths() {
        return this.baths;
    }

    public void setBaths(Integer baths) {
        this.baths = baths;
    }

    public Integer getExpenses() {
        return this.expenses;
    }

    public void setExpenses(Integer expenses) {
        this.expenses = expenses;
    }

    public Integer getRentIncome() {
        return this.rentIncome;
    }

    public void setRentIncome(Integer rentIncome) {
        this.rentIncome = rentIncome;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Date getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

    @Override
    public String toString() {
        return "Property{" +
                "id=" + id +
                ", address='" + address + '\'' +
                ", sqft=" + sqft +
                ", rented=" + isRented +
                ", bedrooms=" + bedrooms +
                ", baths=" + baths +
                ", expenses=" + expenses +
                ", rentIncome=" + rentIncome +
                ", imageUrl='" + imageUrl + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", userId=" + (user == null ? "null" : user.getId()) +
                '}';
    }
}
