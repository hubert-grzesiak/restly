// reservationUtils.test.js

import { calculateTotalDays, calculateTotalPrice } from "./reservationUtils";

describe("Reservation Utilities", () => {
  describe("calculateTotalDays", () => {
    test("should calculate total days between two dates", () => {
      const from = new Date("2023-08-01");
      const to = new Date("2023-08-05");
      const totalDays = calculateTotalDays(from, to);
      expect(totalDays).toBe(4); // 5th - 1st = 4 days
    });

    test("should return 0 when dates are the same", () => {
      const from = new Date("2023-08-01");
      const to = new Date("2023-08-01");
      const totalDays = calculateTotalDays(from, to);
      expect(totalDays).toBe(0);
    });
  });

  describe("calculateTotalPrice", () => {
    test("should calculate total price based on date range and prices", () => {
      const from = new Date("2023-08-01");
      const to = new Date("2023-08-05");
      const prices = [
        { from: "2023-08-01", to: "2023-08-02", price: 100 },
        { from: "2023-08-04", to: "2023-08-05", price: 150 },
      ];

      const totalPrice = calculateTotalPrice(from, to, prices);
      // Days 1-2: 1 day at $100
      // Days 4-5: 1 day at $150
      // Total days = 2

      const expectedPrice = 1 * 100 + 1 * 150; // Corrected calculation
      expect(totalPrice).toBe(expectedPrice);
    });

    test("should return 0 when no overlapping price ranges", () => {
      const from = new Date("2023-08-01");
      const to = new Date("2023-08-02");
      const prices = [{ from: "2023-09-01", to: "2023-09-05", price: 100 }];

      const totalPrice = calculateTotalPrice(from, to, prices);
      expect(totalPrice).toBe(0);
    });
  });
});
