first step is run command 'npm install' to install al dependecies.
to start application run command 'ng serve'

Structure:
- app component calls for router where our main page is defined
- our main page is Dashboard and this includes 2 compnents (make transfer and recent transaction)
- in make transfer we capture the ammount and also who is going to recive the paidment
  - here when click on submit button have 2 validations before processing data:
    - validation 1 is that amount is numeric and 2 is to account have a selected value
    - after this validation need to confirm information with a modal to process the payment
- in recent transaction have a filter that works only after pressing enter and is case sensitive, also have sorting for date and for amount and beneficiary.

