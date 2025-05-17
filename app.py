from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This allows React frontend to talk to Flask backend

# Dummy recipe data
recipes = [
    {
        "title": "Protein Peanut Butter Shake",
        "ingredients": ["fairlife milk", "pb fit", "ice"],
        "macros": {"protein": 30, "carbs": 10, "fats": 5}
    },
    {
        "title": "Banana Protein Cream",
        "ingredients": ["banana", "fairlife milk", "sugar-free pudding mix"],
        "macros": {"protein": 25, "carbs": 20, "fats": 3}
    }
]

@app.route('/ingredients', methods=['POST'])
def get_recipes():
    data = request.json
    user_ingredients = set(data.get('ingredients', []))
    print(f"Received ingredients: {user_ingredients}")

    matched_recipes = []
    for recipe in recipes:
        match_count = len(user_ingredients & set(recipe['ingredients']))
        if match_count > 0:
            recipe['match_score'] = match_count / len(recipe['ingredients'])
            matched_recipes.append(recipe)

    matched_recipes.sort(key=lambda x: x['match_score'], reverse=True)
    return jsonify({"matched_recipes": matched_recipes})

if __name__ == '__main__':
    app.run(debug=True)
