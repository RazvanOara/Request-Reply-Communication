package com.example.demo.Service;

import com.example.demo.Model.Device;
import com.example.demo.Repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    // Create a new device
    public Device createDevice(Device device) {
        return deviceRepository.save(device);
    }

    // Get all devices
    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    // Get a device by ID
    public Optional<Device> getDeviceById(Long id) {
        return deviceRepository.findById(id);
    }

    // Update a device
    public Device updateDevice(Long id, Device deviceDetails) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Device not found with id " + id));
        device.setUserId(deviceDetails.getUserId());
        device.setDescription(deviceDetails.getDescription());
        device.setAddress(deviceDetails.getAddress());
        device.setMaxHourlyConsumption(deviceDetails.getMaxHourlyConsumption());

        return deviceRepository.save(device);
    }

    // Delete a device
    public void deleteDevice(Long id) {
        deviceRepository.deleteById(id);
    }

    // Delete all devices by user ID
    public void deleteDevicesByUserId(Long userId) {
        List<Device> devices = deviceRepository.findByUserId(userId);
        deviceRepository.deleteAll(devices);
    }

    public List<Device> getDevicesByUserId(Long userId) {
        return deviceRepository.findByUserId(userId);
    }

}
