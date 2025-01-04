from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
from pathlib import Path

app = Flask(__name__)
CORS(app)

# Create data directory if it doesn't exist
data_dir = Path(__file__).parent / 'data'
data_dir.mkdir(exist_ok=True)

# Initialize CSV files if they don't exist
categories = ['expenses', 'earnings', 'investments', 'goals']
for category in categories:
    file_path = data_dir / f'{category}.csv'
    if not file_path.exists():
        if category in ['expenses', 'earnings']:
            df = pd.DataFrame(columns=['date', 'amount', 'category', 'description'])
        elif category == 'investments':
            df = pd.DataFrame(columns=['date', 'amount', 'type', 'name', 'notes'])
        else:  # goals
            df = pd.DataFrame(columns=['name', 'target_amount', 'current_amount', 'target_date', 'notes'])
        df.to_csv(file_path, index=False)

@app.route('/api/<category>', methods=['GET'])
def get_data(category):
    try:
        if category not in categories:
            return jsonify({'error': 'Invalid category'}), 400
        
        df = pd.read_csv(data_dir / f'{category}.csv')
        return jsonify(df.to_dict('records'))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/<category>', methods=['POST'])
def add_entry(category):
    try:
        if category not in categories:
            return jsonify({'error': 'Invalid category'}), 400
        
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Validate required fields
        required_fields = {
            'expenses': ['date', 'amount', 'category', 'description'],
            'earnings': ['date', 'amount', 'category', 'description'],
            'investments': ['date', 'amount', 'type', 'name'],
            'goals': ['name', 'target_amount', 'current_amount', 'target_date']
        }
        
        missing_fields = [field for field in required_fields[category] if field not in data]
        if missing_fields:
            return jsonify({'error': f'Missing required fields: {", ".join(missing_fields)}'}), 400

        df = pd.read_csv(data_dir / f'{category}.csv')
        # Use concat instead of append (append is deprecated)
        df = pd.concat([df, pd.DataFrame([data])], ignore_index=True)
        df.to_csv(data_dir / f'{category}.csv', index=False)
        return jsonify({'message': 'Entry added successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_data():
    try:
        expenses_df = pd.read_csv(data_dir / 'expenses.csv')
        earnings_df = pd.read_csv(data_dir / 'earnings.csv')
        investments_df = pd.read_csv(data_dir / 'investments.csv')
        goals_df = pd.read_csv(data_dir / 'goals.csv')
        
        dashboard_data = {
            'total_expenses': expenses_df['amount'].sum(),
            'total_earnings': earnings_df['amount'].sum(),
            'total_investments': investments_df['amount'].sum(),
            'expense_categories': expenses_df.groupby('category')['amount'].sum().to_dict(),
            'goals_progress': goals_df.apply(
                lambda x: {'name': x['name'], 'progress': (x['current_amount'] / x['target_amount']) * 100},
                axis=1
            ).tolist()
        }
        
        return jsonify(dashboard_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
