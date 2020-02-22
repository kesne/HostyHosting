# Worker

This is a worker that pulls work off of a task queue, that is designed to be run independently of the backend. The backend should effectively schedule work to be run here, but the work logic itself, and the execution of the work will be done here.

Basically, in dev we should boot this up as a separate concurrent task thingy to the backend.
