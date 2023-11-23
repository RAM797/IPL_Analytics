from flask import Flask, request, jsonify
import pickle
app = Flask(__name__)

# Sample data (replace this with your actual data)


@app.route('/best_economy', methods=['GET'])
def best_economy():
    year = request.args.get('season')
    with open('data/player_stats/top_bowlers_by_season_corrected_economy.pkl','rb') as bef:
        best_economy = pickle.load(bef)
    print(best_economy)
    if year not in best_economy:
        return jsonify({'error': f'Data not available for the year {year}'}), 404
    return jsonify(best_economy[year])

@app.route('/top_run_scorers', methods=['GET'])
def top_run_scorers():
    year = int(request.args.get('season'))
    with open('data/player_stats/top_scorers.pkl','rb') as tsf:
        top_run_scorers = pickle.load(tsf)
    if year not in top_run_scorers:
        return jsonify({'error': f'Data not available for the year {year}'}), 404
    return jsonify(top_run_scorers[year])


@app.route('/top_wicket_takers', methods=['GET'])
def top_wicket_takers():
    year = request.args.get('season')
    print(year)
    with open('../data/player_stats/top_wicket_takers_by_season_corrected_format.pkl','rb') as twf:
        top_wicket_takers = pickle.load(twf)
    print(top_wicket_takers.keys())
    if year not in top_wicket_takers:
        return jsonify({'error': f'Data not available for the year {year}'}), 404
    return jsonify(top_wicket_takers[year])




if __name__ == '__main__':
    app.run(debug=True)
