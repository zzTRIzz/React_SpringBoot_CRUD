package com.example.demo.controller;

public class Main {
    public static void main(String[] args) {
        int a = 2;
        System.out.println(a);
        a = 3;
        System.out.println(a);

        for (int i = 0; i < 1000; i++) {
            // the program is suspended here
            System.out.println(i);
        }
        System.out.println("Complete!");
    }
}
