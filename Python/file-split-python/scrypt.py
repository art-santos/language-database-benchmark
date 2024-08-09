import sqlite3
import pandas as pd
import os

def decode_bytes(raw_bytes):
    try:
        # Attempt to decode using 'latin-1'
        return raw_bytes.decode('latin-1')
    except UnicodeDecodeError:
        # Fallback: decode using 'windows-1252' with replacement for errors
        return raw_bytes.decode('windows-1252', errors='replace')

constr = '../../../../../../../../Volumes/Driver-1/node-data-streams/data.db'
dat = sqlite3.connect(constr)

# Fetch all table names
tables = dat.execute("SELECT name FROM sqlite_master WHERE type='table';").fetchall()
total_tables = len(tables)
completed_tables = 0

# Maximum size for each CSV file in bytes (490 MB)
max_file_size = 490 * 1024 * 1024

# Iterate over tables
for table in tables:
    table_name = table[0]
    print(f"Processing table: {table_name}")
    
    # Query the table in chunks
    chunk_size = 100000  # Adjust this chunk size as needed
    offset = 0
    file_count = 1

    while True:
        query = f"SELECT *, CAST(NOME AS BLOB) AS NOME_BYTES FROM {table_name} LIMIT {chunk_size} OFFSET {offset};"
        chunk = pd.read_sql_query(query, dat)
        
        if chunk.empty:
            break
        
        # Decode the problematic column manually
        if 'NOME_BYTES' in chunk.columns:
            chunk['NOME'] = chunk['NOME_BYTES'].apply(decode_bytes)
            chunk.drop(columns=['NOME_BYTES'], inplace=True)
        
        # Define the CSV file name
        csv_file = f"{table_name}_part_{file_count}.csv"

        # Write to CSV with forced encoding
        if not os.path.exists(csv_file):
            chunk.to_csv(csv_file, index=False, mode='w', encoding='utf-8', errors='replace')
        else:
            chunk.to_csv(csv_file, index=False, mode='a', header=False, encoding='utf-8', errors='replace')
        
        # Check file size
        file_size = os.path.getsize(csv_file)
        
        # If file size exceeds the maximum, start a new file
        if file_size >= max_file_size:
            file_count += 1
        
        offset += chunk_size

    completed_tables += 1
    remaining_tables = total_tables - completed_tables
    print(f"Progress: {completed_tables}/{total_tables} tables completed. {remaining_tables} tables remaining.")

print('Finished processing all tables.')
