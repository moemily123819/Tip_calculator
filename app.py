# import necessary libraries
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)



# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


# send the jsonified results
@app.route("/send", methods=["GET", "POST"])
def send():
    if request.method == "POST":
        billAmt = request.form["billAmt"]
        nbrPeople = request.form["nbrPeople"]
        tipPerc = request.form["tipPerc"]
  
        inputdata=[{"billAmt" : billAmt,
              "tipPerc" : tipPerc,
              "nbrPeople" : nbrPeople
              }]
        print('about to redirect')
        return redirect("/", code=302)
   
    return render_template("index.html")


#    return jsonify(inputdata)



if __name__ == "__main__":
    app.run()
