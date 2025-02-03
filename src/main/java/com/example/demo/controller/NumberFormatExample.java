package com.example.demo.controller;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Locale;

public class NumberFormatExample {
    public static void main(String[] args) {
        BigDecimal amount = BigDecimal.valueOf(10000000.2);

        // Định dạng tiền tệ cho USD
        Locale locale = new Locale("vi","VN");
        NumberFormat formatter = NumberFormat.getCurrencyInstance(locale);
        String formattedAmount = formatter.format(amount);
        System.out.println("Formatted Amount (USD): " + formattedAmount);  // $1,000.55
    }
}
