from flask import Flask, render_template
from routes.api.graf.ip_vg_curve import ip_vg
app = Flask(__name__)


# ホームページのルート
@app.route("/")
def index():
    return render_template("index.html")


# ip_vg曲線のJSONを取得するAPI
@app.route("/ip_vg_api")
def ip_vg_api():
    return ip_vg()


if __name__ == "__main__":
    app.run(port=8080, debug=True)
