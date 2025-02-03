package com.example.demo.controller;

import java.math.BigDecimal;
import java.util.Currency;

public class Main {
    public static void main(String[] args) {
        System.out.println(0.1 + 0.2 == 0.3? true: false);
        System.out.println(BigDecimal.valueOf(0.3).compareTo(BigDecimal.valueOf(0.1).add(BigDecimal.valueOf(0.2))) == 0);


        try {
            Currency currency = Currency.getInstance("KRW");
            System.out.println(currency);
            System.out.println("currency.getDisplayName() = " + currency.getDisplayName());;
            System.out.println("currency.getCurrencyCode() = " + currency.getCurrencyCode());
            System.out.println("currency.getSymbol() = " + currency.getSymbol());
            System.out.println("currency.getNumericCode() = " + currency.getNumericCodeAsString());
            System.out.println("currency.getDefaultFractionDigits() = " + currency.getDefaultFractionDigits());
        }catch (IllegalArgumentException e){
            System.out.println("Ngân hàng không tồn tại");
        }
        
    }
}