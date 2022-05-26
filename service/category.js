const CATEGORY = {
  book: 'Book',
  cloth: 'Clothes',
  food: 'Food',
  medicine: 'Medicine',
  music: 'Music',
  imported: 'Imported',
}

class Category {
  /**
   * Items category
   * @param {string} name - name of the category
   */
  constructor(name) {
    this.name = name
  }

  /**
   * Get the name of the category
   * @returns {string} name
   */
  getName() {
    return this.name
  }

  /**
   * Get the tax of the item purchased
   */
  getTax() {
    throw new Error('Must override this method in child class')
  }
}

class Book extends Category {
  constructor() {
    super(CATEGORY.book)
  }

  getTax() {
    return 0
  }
}

class Cloth extends Category {
  constructor() {
    super(CATEGORY.cloth)
  }

  // returns the tax of purchased cloths based on
  // total price of the clothes
  getTax(price) {
    return price > 1000 ? 12 : 5
  }
}

class Food extends Category {
  constructor() {
    super(CATEGORY.food)
  }

  getTax() {
    return 5
  }
}

class Medicine extends Category {
  constructor() {
    super(CATEGORY.medicine)
  }

  getTax() {
    return 5
  }
}

class Music extends Category {
  constructor() {
    super(CATEGORY.music)
  }

  getTax() {
    return 3
  }
}

class Imported extends Category {
  constructor() {
    super(CATEGORY.music)
  }

  getTax() {
    return 18
  }
}

class CategoryFactory {
  // create a category instance
  make(name) {
    switch (name) {
      case CATEGORY.book: {
        return new Book()
      }
      case CATEGORY.cloth: {
        return new Cloth()
      }
      case CATEGORY.food: {
        return new Food()
      }
      case CATEGORY.medicine: {
        return new Medicine()
      }
      case CATEGORY.music: {
        return new Music()
      }
      case CATEGORY.imported: {
        return new Imported()
      }
      default: {
        throw new Error('Unexpected category name received ' + name)
      }
    }
  }
}

export {CATEGORY, CategoryFactory}
