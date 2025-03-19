# Use official Python 3.9 image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy all project files into the container
COPY . /app/

# Install dependencies
RUN pip install --upgrade pip \
    && pip install --no-cache-dir --force-reinstall google-earthengine \
    && pip install -r requirements.txt

# Expose the application port (default Flask port)
EXPOSE 5000

# Command to run the application
CMD ["gunicorn", "-b", "0.0.0.0:5000", "api_main:app"]
