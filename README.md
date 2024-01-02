This is a todo application made with JavaScript. This website is designed using Tailwind CSS. 

-Josef Gisis 12/05/2023

Project Requirements:
  - Lists:
    - All todo items are contained within lists.
    - The web application automatically instantiates a default list for quick todo creation. 
    - Default list need to have...
      1. A preset title.
      2. A count of the items it contains. 
    - Default list cannot be deleted, is displayed by default, and cannot be renamed. 

    - Users can create custom lists.
    - Custom lists need to have...
      1. A title.
      2. A creation date.
      3. A count of the items it contains.
      4. A method to delete the list and all of its contents.
      5. A method to edit the title of the list. 

  - TODO items:
    - Users can instantiate TODOs.
    - Todo items contain an attribute that associates them with a particular list.
    - All todo items share these features...
      1. They have a title. 
      2. They have a creation date. 
      3. They have a completion status, complete or incomplete, indicated by a checkmark.
      4. They have a due date, that may be indefinite or definite. 
      5. They have a method that edits the title, description, and due date.
      6. They have a method to delete the item. 
      7. They change their appearance when completed (e.g. crossed out, color change, etc.).
      8. They have a position relative to other items within the same list. 
      9. A method to reposition the TODO relative to the other items within the same list.
      10. Each todo can move to a different list.  
    - All todo items need to display a condescending comment when items are checked-off.