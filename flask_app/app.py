from flask import Flask, request, jsonify
import pickle
app = Flask(__name__)

# Sample data (replace this with your actual data)
player_stats = 'data/player_stats/'

# boxplot data
@app.route('/bowler_economy', methods=['GET'])
def bowler_economy():
    year = int(request.args.get('year'))
    response = None
    with open(player_stats+'bowler_metrics.pkl','rb') as bef:
        bowler_stats = pickle.load(bef)
        if year not in bowler_stats:
            return jsonify({'error': f'Data not available for the year {year}'}), 404
        response = [round(bowler_stats[year][p]['economy'],2) for p in bowler_stats[year]]
    return jsonify(response)

#barchart 
@app.route('/top_run_scorers', methods=['GET'])
def top_run_scorers():
    year = int(request.args.get('year'))
    response = None
    with open(player_stats+'batsman_metrics.pkl','rb') as tsf:
        batsman_stats = pickle.load(tsf)
        if year not in batsman_stats:
            return jsonify({'error': f'Data not available for the year {year}'}), 404
        runs = {p : batsman_stats[year][p]['runs'] for p in batsman_stats[year]}
        top5 = sorted(runs.keys(), key  = lambda x: runs[x], reverse = True)[:5]
        response = {p: runs[p] for p in top5}
    return jsonify(response)

#barchart
@app.route('/top_wicket_takers', methods=['GET'])
def top_wicket_takers():
    year = int(request.args.get('year'))
    response = None
    with open(player_stats+'bowler_metrics.pkl','rb') as tsf:
        bowler_stats = pickle.load(tsf)
        if year not in bowler_stats:
            return jsonify({'error': f'Data not available for the year {year}'}), 404
        wickets = {p : bowler_stats[year][p]['wickets_taken'] for p in bowler_stats[year]}
        top5 = sorted(wickets.keys(), key  = lambda x: wickets[x], reverse = True)[:5]
        response = {p: wickets[p] for p in top5}
    return jsonify(response)
    
# scatterplot matrix data
@app.route('/bowler_metrics', methods=['GET'])
def bowler_metrics():
    return jsonify(None)

# scatterplot matrix data
@app.route('/batsman_metrics', methods=['GET'])
def batsman_metrics():
    return jsonify(None)


# multi line graph data
@app.route('/top_strike_rates', methods=['GET'])
def top_strike_tates():
    response = None
    year = int(request.args.get('year'))
    with open(player_stats+'top_strike_rates.pkl','rb') as bef:
        strike_rates = pickle.load(bef)
        if year not in strike_rates:
            return jsonify({'error': f'Data not available for the year {year}'}), 404
        response = strike_rates[year]
    return jsonify(response)
    




if __name__ == '__main__':
    app.run(debug=True)
