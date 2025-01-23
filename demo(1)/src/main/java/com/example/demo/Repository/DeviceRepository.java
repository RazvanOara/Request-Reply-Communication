package com.example.demo.Repository;

import com.example.demo.Model.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device> findByUserId(Long userId); // Method to find devices by user ID
}
