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

@app.route('/api/<category>/<int:index>', methods=['DELETE'])
def delete_entry(category, index):
    try:
        if category not in categories:
            return jsonify({'error': 'Invalid category'}), 400
        
        file_path = data_dir / f'{category}.csv'
        df = pd.read_csv(file_path)
        
        if index < 0 or index >= len(df):
            return jsonify({'error': 'Invalid index'}), 400
            
        # Remove the row at the specified index
        df = df.drop(index)
        df.to_csv(file_path, index=False)
        
        return jsonify({'message': f'{category} entry deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_data():
    try:
        print("Starting get_dashboard_data...")
        print(f"Data directory path: {data_dir}")
        
        # Check if files exist
        for file_name in ['expenses.csv', 'earnings.csv', 'investments.csv', 'goals.csv']:
            file_path = data_dir / file_name
            print(f"Checking {file_name}: exists = {file_path.exists()}")
        
        # Read CSV files with error handling
        try:
            expenses_df = pd.read_csv(data_dir / 'expenses.csv')
            print("Expenses DataFrame:", expenses_df.head())
        except Exception as e:
            print(f"Error reading expenses.csv: {str(e)}")
            expenses_df = pd.DataFrame(columns=['date', 'amount', 'category', 'description'])

        try:
            earnings_df = pd.read_csv(data_dir / 'earnings.csv')
            print("Earnings DataFrame:", earnings_df.head())
        except Exception as e:
            print(f"Error reading earnings.csv: {str(e)}")
            earnings_df = pd.DataFrame(columns=['date', 'amount', 'category', 'description'])

        try:
            investments_df = pd.read_csv(data_dir / 'investments.csv')
            print("Investments DataFrame:", investments_df.head())
        except Exception as e:
            print(f"Error reading investments.csv: {str(e)}")
            investments_df = pd.DataFrame(columns=['date', 'amount', 'type', 'name', 'notes'])

        try:
            goals_df = pd.read_csv(data_dir / 'goals.csv')
            print("Goals DataFrame:", goals_df.head())
        except Exception as e:
            print(f"Error reading goals.csv: {str(e)}")
            goals_df = pd.DataFrame(columns=['name', 'target_amount', 'current_amount', 'target_date', 'notes'])
        
        # Calculate totals with error handling
        total_expenses = expenses_df['amount'].sum() if not expenses_df.empty else 0
        total_earnings = earnings_df['amount'].sum() if not earnings_df.empty else 0
        total_investments = investments_df['amount'].sum() if not investments_df.empty else 0
        
        # Create expense categories dict with error handling
        expense_categories = expenses_df.groupby('category')['amount'].sum().to_dict() if not expenses_df.empty else {}
        
        # Create goals progress with error handling
        goals_progress = []
        if not goals_df.empty:
            for _, row in goals_df.iterrows():
                try:
                    progress = (row['current_amount'] / row['target_amount']) * 100
                    goals_progress.append({
                        'name': row['name'],
                        'progress': progress
                    })
                except Exception as e:
                    print(f"Error processing goal {row['name']}: {str(e)}")
        
        dashboard_data = {
            'total_expenses': float(total_expenses),
            'total_earnings': float(total_earnings),
            'total_investments': float(total_investments),
            'expense_categories': expense_categories,
            'goals_progress': goals_progress
        }
        
        print("Dashboard data:", dashboard_data)
        return jsonify(dashboard_data)
    except Exception as e:
        print(f"Error in get_dashboard_data: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
