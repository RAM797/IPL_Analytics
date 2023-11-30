from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
app = Flask(__name__)
CORS(app)
# Sample data (replace this with your actual data)

player_stats_path = '../data/player_stats/'
team_stats_path = '../data/team_stats/'
season_stats_path = '../data/season_stats/'
# boxplot data
@app.route('/bowler_economy', methods=['GET'])
def bowler_economy():
    year = int(request.args.get('year'))
    response = []

    with open(player_stats_path+'bowler_stats.pkl','rb') as bef:
        bowler_stats = pickle.load(bef)
        if year not in bowler_stats:
            return jsonify({'error': f'Data not available for the year {year}'}), 404
        for p in bowler_stats[year]:
            if bowler_stats[year][p]['balls_bowled'] > 60:
                response += [bowler_stats[year][p]['economy']]
    return jsonify(response)

#barchart 
@app.route('/top_run_scorers', methods=['GET'])
def top_run_scorers():
    year = int(request.args.get('year'))
    response = None
    with open(player_stats_path+'batsman_stats.pkl','rb') as tsf:
        batsman_stats = pickle.load(tsf)
        if year not in batsman_stats:
            return jsonify({'error': f'Data not available for the year {year}'}), 404
        runs = {p : batsman_stats[year][p]['runs'] for p in batsman_stats[year]}
        teams = {p : batsman_stats[year][p]['team'] for p in batsman_stats[year]}
        top5 = sorted(runs.keys(), key  = lambda x: runs[x], reverse = True)[:5]
        response = [{'player': p, 'runs' : runs[p], 'team': teams[p]} for p in top5]
        print(response)
    return jsonify(response)

#barchart
@app.route('/top_wicket_takers', methods=['GET'])
def top_wicket_takers():
    year = int(request.args.get('year'))
    response = None
    with open(player_stats_path+'bowler_stats.pkl','rb') as tsf:
        bowler_stats = pickle.load(tsf)
        if year not in bowler_stats:
            return jsonify({'error': f'Data not available for the year {year}'}), 404
        wickets = {p : bowler_stats[year][p]['wickets_taken'] for p in bowler_stats[year]}
        teams = {p : bowler_stats[year][p]['team'] for p in bowler_stats[year]}
        top5 = sorted(wickets.keys(), key  = lambda x: wickets[x], reverse = True)[:5]
        response = [{'player': p, 'wickets' : wickets[p], 'team': teams[p]} for p in top5]
    return jsonify(response)
    
# scatterplot matrix data
@app.route('/bowler_metrics', methods=['GET'])
def bowler_metrics():
    year = int(request.args.get('year'))
    response = None
    with open(player_stats_path+'bowler_stats.pkl','rb') as tsf:
        bowler_stats = pickle.load(tsf)
        if year not in bowler_stats:
            return jsonify({'error': f'Data not available for the year {year}'}), 404
    return jsonify(bowler_stats[year])

# scatterplot matrix data
@app.route('/batsman_metrics', methods=['GET'])
def batsman_metrics():
    year = int(request.args.get('year'))
    response = None
    with open(player_stats_path+'batsman_stats.pkl','rb') as tsf:
        batsman_stats = pickle.load(tsf)
        if year not in batsman_stats:
            return jsonify({'error': f'Data not available for the year {year}'}), 404
    return jsonify(batsman_stats[year])


# multi line graph data
@app.route('/top_strike_rates', methods=['GET'])
def top_strike_tates():
    response = None
    year = int(request.args.get('year'))
    with open(player_stats_path+'top_strike_rates.pkl','rb') as bef:
        strike_rates = pickle.load(bef)
        if year not in strike_rates:
            return jsonify({'error': f'Data not available for the year {year}'}), 404
        response = strike_rates[year]
    return jsonify(response)
    


@app.route('/championships', methods=['GET'])
def championships():
    response = {}
    with open(team_stats_path +'championships.pkl','rb') as cp:
        response = pickle.load(cp)
    return jsonify(response)

@app.route('/win_loss', methods=['GET'])
def win_loss():
    response = {}
    year = int(request.args.get('year'))
    with open(team_stats_path+'winloss.pkl','rb') as wl:
        win_loss = pickle.load(wl)
        if year not in win_loss:
            return jsonify({'error': f'Data not available for the year {year}'}), 404
        response = win_loss[year]
    return jsonify(response)

@app.route('/boundaries', methods=['GET'])
def boundaries():
    response = {}
    year = int(request.args.get('year'))
    with open(team_stats_path+'team_stats.pkl','rb') as ts:
        team_stats = pickle.load(ts)
        if year not in team_stats:
            return jsonify({'error': f'Data not available for the year {year}'}), 404
        data = team_stats[year]
        sorted_teams = sorted(data.keys(), key = lambda x: data[x]['boundaries'], reverse = True)
        response = [{'team': team, 'boundaries': data[team]['boundaries']} for team  in sorted_teams]
    return jsonify(response)

@app.route('/all_team_stats', methods=['GET'])
def all_team_stats():
    year = int(request.args.get('year'))
    response = {}
    with open(team_stats_path +'team_stats.pkl','rb') as ts:
        all_team_stats = pickle.load(ts)
        if year not in all_team_stats:
            return jsonify({'error': f'Data not available for the year {year}'}), 404
        response = all_team_stats[year]
    return jsonify(response)
@app.route('/dismissal_metrics', methods=['GET'])
def dismissal_metrics():
    response = None
    year = int(request.args.get('year'))
    with open(season_stats_path+'dismissal_metrics.pkl','rb') as dm:
        dismissal = pickle.load(dm)
        if year not in dismissal:
            return jsonify({'error': f'Data not available for the year {year}'}), 404
        response = dismissal[year]
    return jsonify(response)

@app.route('/toss_metrics', methods=['GET'])
def toss_metrics():
    response = None
    year = int(request.args.get('year'))
    with open(season_stats_path+'toss_metrics.pkl','rb') as tm:
        toss = pickle.load(tm)
        if year not in toss:
            return jsonify({'error': f'Data not available for the year {year}'}), 404
        response = toss[year]
    return jsonify(response)

@app.route('/venue_metrics', methods=['GET'])
def venue_metrics():
    response = None
    year = int(request.args.get('year'))
    with open(season_stats_path+'venue_metrics.pkl','rb') as vm:
        venue = pickle.load(vm)
        if year not in venue:
            return jsonify({'error': f'Data not available for the year {year}'}), 404
        response = venue[year]
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)