from flask import Flask, request, jsonify
import pickle
app = Flask(__name__)

# Sample data (replace this with your actual data)


@app.route('/best_economy', methods=['GET'])
def best_economy():
    year = int(request.args.get('year'))
    with open('flask_app/best_economies.pkl','rb') as bef:
        best_economy = pickle.load(bef)
    print(best_economy)
    if year not in best_economy:
        return jsonify({'error': f'Data not available for the year {year}'}), 404
    return jsonify(best_economy[year])

@app.route('/top_run_scorers', methods=['GET'])
def top_run_scorers():
    year = int(request.args.get('year'))
    with open('flask_app/top_scorers.pkl','rb') as tsf:
        top_run_scorers = pickle.load(tsf)
    if year not in top_run_scorers:
        return jsonify({'error': f'Data not available for the year {year}'}), 404
    return jsonify(top_run_scorers[year])

if __name__ == '__main__':
    app.run(debug=True)
