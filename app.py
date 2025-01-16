from flask import *
from routes.api.graf.ip_vg_curve import ip_vg
app = Flask(__name__)


# ホームページのルート
@app.route("/")
def index():
    return render_template("index.html")


# ip_vg曲線のJSONを取得するAPI
@app.route("/ip_vg_api",methods=["POST"])
def ip_vg_api():
    data = request.data.decode('utf-8')#デコード
    print(data)
    return ip_vg(data)


if __name__ == "__main__":
    app.run(port=8000, debug=True)
