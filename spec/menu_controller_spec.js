const MenuController = require("../controllers/MenuController");

describe("MenuController", () => {
  
  describe("#getContactCount()", () => {
    beforeEach(() => {
      this.menu = new MenuController();
    })

    it("should return 0 when no contacts are in the book", () => {
      expect(this.menu.getContactCount()).toBe(0);
    });

    it("should return 1 when there is exactly one contact in the book", () => {
      this.menu.contacts.push("Bob");
      expect(this.menu.getContactCount()).toBe(1);
    });
  });

  describe("#remindMe()", () => {
    beforeEach(() => {
      this.menu = new MenuController();
    });

    it("should return 'Learning is a life-long pursuit.' when called", () => {
      expect(this.menu.remindMe()).toBe("Learning is a life-long pursuit.");
    });

    it("should not return anything other than 'Learning is a life-long pursuit.", () => {
      expect(this.menu.remindMe() !== "Learning is a life-long pursuit.").toBeFalsy()
    });
  })

});