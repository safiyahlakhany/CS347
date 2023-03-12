"""
A class implementation of a bank account in Python. This class has some mystery functions for you to decode!
"""


class Account:
# !@ initialize object and member variables
    def __init__(self, name, account_number, initial_amount):
        self.name = name
        self.no = account_number
        self.balance = initial_amount

# !@ basic withdraw and deposit methods
    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        self.balance -= amount
        
    def mystery1(self, amount):
        if self.balance > 10:
            self.deposit(amount * 2)

# !@ second mystery about animal strings
    def mystery2(self, new_name):
        if len(new_name) % 3 == 0:
            return "walrus"
        elif len(new_name) % 3 == 1:
                return "panda"
        return "tiger"

    
    def mystery3(self, new_name, amount):
        a = self.mystery2(new_name)
        self.name = "anonymous " + a
        print("User " + self.name + " is requesting " + str(amount))
        return "we "

    def mystery4(self):
        self.mystery1(20)
        self.mystery2("Luna")
        print(self.balance)

    def mystery5(self, num):
        self.no = num * 2
        self.mystery2("Leo")
        print(self.name + " has an a new account number of " + str(self.no))

    def mystery6(self):
        return "champion"    

    def __str__(self):
        return "User named " + self.name + " with account number " + str(self.no) + " has $" + str(self.balance)


# !@ using our class below

user1 = Account("Obama", 123, 100)
a = user1.mystery2("Bob")
b = user1.mystery3("Chad", 200)
c = user1.name
d = user1.mystery6()
e = b + d
f = user1.mystery4()
