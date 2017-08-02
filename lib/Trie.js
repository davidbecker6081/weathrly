import Node from './Node';

export default class Trie {
  constructor() {
    this.root = new Node('');
    this.wordCount = 0;
  }

  insert(word) {
    const arrayOfLetters = [...word];
    let currNode = this.root;

    arrayOfLetters.forEach((letter) => {
      if (!currNode.children[letter]) {
        currNode.children[letter] = new Node(letter);
      }
      currNode = currNode.children[letter];
    });

    if (!currNode.isWord) {
      currNode.isWord = true;
      this.wordCount += 1;
    }
  }

  count() {
    return this.wordCount;
  }

  suggest(word) {
    const arrayOfLetters = [...word];
    let currNode = this.root;
    const suggestionsArray = [];

    for (let i = 0; i < arrayOfLetters.length && currNode; i++) {
      currNode = currNode.children[arrayOfLetters[i]];
    }

    const searchTree = (currentWord, currentNode) => {
      const keys = Object.keys(currentNode.children);

      keys.forEach((key) => {
        const child = currentNode.children[key];
        const wordBuilder = currentWord + child.letter;
        if (child.isWord) {
          suggestionsArray.push({ word: wordBuilder,
                                  hits: child.hitCounter,
                                  lastTouched: child.lastTouched });
        }
        searchTree(wordBuilder, child);
      });
    };

    if (currNode && currNode.isWord) {
      suggestionsArray.push({ word: word,
                              hits: currNode.hitCounter,
                              lastTouched: currNode.lastTouched });
    }

    if (currNode) {
      searchTree(word, currNode);
    }

    suggestionsArray.sort((a, b) => {
      return b.hits - a.hits ||
             b.lastTouched - a.lastTouched;
    });

    return suggestionsArray.map((item) => {
      return item.word;
    });
  }

  select(word) {
    const arrayOfLetters = [...word];
    let currNode = this.root;

    arrayOfLetters.forEach(letter => {
      currNode = currNode.children[letter];
    });

    if (currNode) {
      currNode.hitCounter += 1;
      currNode.lastTouched = Date.now();
    }
  }

  populate(dataObj) {
    let cityArray = dataObj.data
    cityArray.forEach((city) => {
      this.insert(city.toLowerCase());
    });
  }
}
